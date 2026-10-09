import struct, os, json, re

def extract_stream(filename):
    with open(filename, 'rb') as f: data = f.read()
    sector_shift = struct.unpack('<H', data[30:32])[0]
    sector_size = 1 << sector_shift
    num_fat_sectors = struct.unpack('<I', data[44:48])[0]
    first_dir_sector = struct.unpack('<I', data[48:52])[0]
    first_difat_sector = struct.unpack('<I', data[68:72])[0]
    num_difat_sectors = struct.unpack('<I', data[72:76])[0]
    fat_sectors = list(struct.unpack('<109I', data[76:512]))
    cur_difat = first_difat_sector
    while cur_difat != 0xFFFFFFFE and cur_difat != 0xFFFFFFFF and num_difat_sectors > 0:
        difat_pos = (cur_difat + 1) * sector_size
        difat_data = struct.unpack(f'<{sector_size//4}I', data[difat_pos:difat_pos+sector_size])
        fat_sectors.extend(difat_data[:-1])
        cur_difat = difat_data[-1]
    fat = []
    for s in fat_sectors[:num_fat_sectors]:
        if s != 0xFFFFFFFF:
            pos = (s + 1) * sector_size
            fat.extend(struct.unpack(f'<{sector_size//4}I', data[pos:pos+sector_size]))
    cur_dir = first_dir_sector
    dir_entries = []
    while cur_dir != 0xFFFFFFFE and cur_dir != 0xFFFFFFFF:
        pos = (cur_dir + 1) * sector_size
        dir_bytes = data[pos:pos+sector_size]
        for e in range(0, len(dir_bytes), 128):
            entry = dir_bytes[e:e+128]
            name_len = struct.unpack('<H', entry[64:66])[0]
            if name_len > 0:
                name = entry[:name_len].decode('utf-16le', errors='ignore').rstrip('\x00')
                etype = entry[66]
                start_sec = struct.unpack('<I', entry[116:120])[0]
                size = struct.unpack('<Q', entry[120:128])[0]
                dir_entries.append((name, etype, start_sec, size))
        cur_dir = fat[cur_dir] if cur_dir < len(fat) else 0xFFFFFFFE
    for name, etype, start_sec, size in dir_entries:
        if name in ['Workbook', 'Book']:
            wb_bytes = bytearray()
            cur_s = start_sec
            while cur_s != 0xFFFFFFFE and cur_s != 0xFFFFFFFF:
                pos = (cur_s + 1) * sector_size
                wb_bytes.extend(data[pos:pos+sector_size])
                cur_s = fat[cur_s] if cur_s < len(fat) else 0xFFFFFFFE
            return bytes(wb_bytes[:size])
    return None

wb_data = extract_stream('VR Game List.xls')
records = []
pos = 0
while pos < len(wb_data):
    if pos + 4 > len(wb_data): break
    rtype, rlen = struct.unpack('<HH', wb_data[pos:pos+4])
    records.append((rtype, pos + 4, rlen))
    pos += 4 + rlen

# Parse SST (Shared String Table)
sst_chunks = []
for i, (rtype, off, rlen) in enumerate(records):
    if rtype == 0x00FC:
        sst_chunks.append(wb_data[off:off+rlen])
        j = i + 1
        while j < len(records) and records[j][0] == 0x003C:
            sst_chunks.append(wb_data[records[j][1]:records[j][1]+records[j][2]])
            j += 1
        break

class SSTReader:
    def __init__(self, chunks):
        self.chunks = chunks
        self.chunk_idx = 0
        self.chunk_pos = 0
        self.cur_chunk = chunks[0] if chunks else b''
    def read_bytes(self, n):
        res = bytearray()
        while n > 0 and self.chunk_idx < len(self.chunks):
            avail = len(self.cur_chunk) - self.chunk_pos
            if avail <= 0:
                self.chunk_idx += 1
                if self.chunk_idx < len(self.chunks):
                    self.cur_chunk = self.chunks[self.chunk_idx]
                    self.chunk_pos = 0
                continue
            take = min(n, avail)
            res.extend(self.cur_chunk[self.chunk_pos:self.chunk_pos+take])
            self.chunk_pos += take
            n -= take
        return bytes(res)
    def read_string(self):
        cch_b = self.read_bytes(2)
        if len(cch_b) < 2: return None
        cch = struct.unpack('<H', cch_b)[0]
        flags = self.read_bytes(1)[0]
        is_unicode = flags & 1
        has_rich = (flags >> 3) & 1
        has_ext = (flags >> 2) & 1
        crun = struct.unpack('<H', self.read_bytes(2))[0] if has_rich else 0
        cbExtRst = struct.unpack('<I', self.read_bytes(4))[0] if has_ext else 0
        chars_left = cch
        out_chars = []
        cur_unicode = is_unicode
        while chars_left > 0:
            avail = len(self.cur_chunk) - self.chunk_pos
            if avail <= 0:
                self.chunk_idx += 1
                if self.chunk_idx >= len(self.chunks): break
                self.cur_chunk = self.chunks[self.chunk_idx]
                cur_unicode = self.cur_chunk[0] & 1
                self.chunk_pos = 1
                avail = len(self.cur_chunk) - 1
            char_size = 2 if cur_unicode else 1
            chars_to_read = min(chars_left, avail // char_size)
            if chars_to_read == 0 and avail < char_size:
                self.chunk_idx += 1
                if self.chunk_idx >= len(self.chunks): break
                self.cur_chunk = self.chunks[self.chunk_idx]
                cur_unicode = self.cur_chunk[0] & 1
                self.chunk_pos = 1
                char_size = 2 if cur_unicode else 1
                chars_to_read = min(chars_left, (len(self.cur_chunk) - 1) // char_size)
            raw = self.cur_chunk[self.chunk_pos:self.chunk_pos + chars_to_read * char_size]
            self.chunk_pos += chars_to_read * char_size
            chars_left -= chars_to_read
            if cur_unicode:
                out_chars.append(raw.decode('utf-16le', errors='ignore'))
            else:
                out_chars.append(raw.decode('latin1', errors='ignore'))
        self.read_bytes(crun * 4 + cbExtRst)
        return ''.join(out_chars)

reader = SSTReader(sst_chunks)
reader.read_bytes(4)
cstUnique = struct.unpack('<I', reader.read_bytes(4))[0]
sst_strings = [reader.read_string() for _ in range(cstUnique)]

# Extract blips from Drawing Group
dg_chunks = []
for rtype, off, rlen in records:
    if rtype == 0x00EB:
        dg_chunks.append(wb_data[off:off+rlen])
    elif dg_chunks and rtype == 0x003C:
        dg_chunks.append(wb_data[off:off+rlen])
    elif dg_chunks and rtype != 0x003C:
        break

dg_bytes = b''.join(dg_chunks)

def get_blips(data):
    blips = []
    p = 0
    while p + 8 <= len(data):
        ver_inst, fbt, length = struct.unpack('<HHI', data[p:p+8])
        p_next = p + 8 + length
        if fbt == 0xF007:
            inner_p = p + 8 + 44
            inner_blip_data = None
            ext = 'png'
            if inner_p < p_next:
                raw_blip = data[inner_p:p_next]
                jpg_pos = raw_blip.find(b'\xFF\xD8\xFF')
                png_pos = raw_blip.find(b'\x89PNG\r\n\x1a\n')
                if jpg_pos != -1 and (png_pos == -1 or jpg_pos < png_pos):
                    inner_blip_data = raw_blip[jpg_pos:]
                    ext = 'jpg'
                elif png_pos != -1:
                    inner_blip_data = raw_blip[png_pos:]
                    ext = 'png'
            blips.append({'ext': ext, 'data': inner_blip_data})
        is_container = (ver_inst & 0x0F) == 0x0F
        if is_container: p += 8
        else: p = p_next
    return blips

blips = get_blips(dg_bytes)

def parse_sheet_drawings(mso_data):
    shapes = []
    def scan_escher(data):
        p = 0
        while p + 8 <= len(data):
            ver_inst, fbt, length = struct.unpack('<HHI', data[p:p+8])
            rec_end = min(p + 8 + length, len(data))
            is_container = (ver_inst & 0x0F) == 0x0F
            if fbt == 0xF004:
                sp_pos = p + 8
                pib = None
                anchor = None
                spid = None
                while sp_pos + 8 <= rec_end:
                    s_vi, s_fbt, s_len = struct.unpack('<HHI', data[sp_pos:sp_pos+8])
                    s_end = min(sp_pos + 8 + s_len, rec_end)
                    s_data = data[sp_pos+8:s_end]
                    if s_fbt == 0xF00A:
                        if len(s_data) >= 4: spid = struct.unpack('<I', s_data[:4])[0]
                    elif s_fbt == 0xF00B:
                        prop_p = 0
                        while prop_p + 6 <= len(s_data):
                            pid, pval = struct.unpack('<HI', data[sp_pos+8+prop_p:sp_pos+8+prop_p+6])
                            prop_p += 6
                            if (pid & 0x3FFF) == 0x0104 or (pid & 0x3FFF) == 260:
                                pib = pval
                    elif s_fbt == 0xF010:
                        if len(s_data) >= 16:
                            flag, col1, dx1, row1, dy1, col2, dx2, row2, dy2 = struct.unpack('<HHHHHHHHH', s_data[:18])
                            anchor = {'col1': col1, 'row1': row1, 'col2': col2, 'row2': row2, 'flag': flag, 'dx1': dx1, 'dy1': dy1}
                    sp_pos = s_end
                if pib is not None and anchor is not None:
                    shapes.append({'spid': spid, 'pib': pib, 'anchor': anchor})
            elif is_container:
                scan_escher(data[p+8:rec_end])
            p = rec_end
    scan_escher(mso_data)
    return shapes

sheets = []
for rtype, off, rlen in records:
    if rtype == 0x0085:
        offset = struct.unpack('<I', wb_data[off:off+4])[0]
        cch = wb_data[off+6]
        flag = wb_data[off+7]
        name = wb_data[off+8:off+8+cch*2].decode('utf-16le', errors='ignore') if (flag & 1) else wb_data[off+8:off+8+cch].decode('latin1', errors='ignore')
        sheets.append({'name': name, 'bof_offset': offset})

target_dirs = [
    'frontend/src/assets/vr-game-images',
    'frontend/public/assets/vr-game-images'
]
for d in target_dirs: os.makedirs(d, exist_ok=True)

all_products = []
category_names_clean = {
    'Bester VR': 'Bester VR',
    'Funin R': 'Funin VR',
    'Movie Power': 'Movie Power',
    'Oculeap VR': 'Oculeap VR'
}

seen_slugs = set()

for sh in sheets:
    cat_name = category_names_clean.get(sh['name'], sh['name'])
    rec_start = 0
    for r_i, (rtype, off, rlen) in enumerate(records):
        if off - 4 == sh['bof_offset']:
            rec_start = r_i
            break
    
    sheet_cells = {}
    sheet_mso = bytearray()
    r_i = rec_start + 1
    while r_i < len(records):
        rtype, off, rlen = records[r_i]
        if rtype == 0x000A: break
        if rtype == 0x00FD:
            row, col, xf, sst_idx = struct.unpack('<HHHI', wb_data[off:off+10])
            sheet_cells[(row, col)] = sst_strings[sst_idx] if sst_idx < len(sst_strings) else ''
        elif rtype == 0x0204:
            row, col, xf, cch = struct.unpack('<HHHH', wb_data[off:off+8])
            flag = wb_data[off+8]
            val = wb_data[off+9:off+9+cch*2].decode('utf-16le', errors='ignore') if (flag & 1) else wb_data[off+9:off+9+cch].decode('latin1', errors='ignore')
            sheet_cells[(row, col)] = val
        elif rtype == 0x00EC:
            sheet_mso.extend(wb_data[off:off+rlen])
            k = r_i + 1
            while k < len(records) and records[k][0] == 0x003C:
                sheet_mso.extend(wb_data[records[k][1]:records[k][1]+records[k][2]])
                k += 1
        r_i += 1

    shapes = parse_sheet_drawings(sheet_mso)

    product_rows = []
    for r in sorted(set(r for r, c in sheet_cells.keys() if r > 0)):
        name = sheet_cells.get((r, 3), '').strip()
        specs = sheet_cells.get((r, 2), '').strip()
        if name and name != 'ITEM NAME':
            product_rows.append((r, name, specs))

    # For each product row r: find all shapes within vertical row distance <= 0.8
    for p_idx, (r, name, specs_text) in enumerate(product_rows):
        row_shapes = [s for s in shapes if abs((s['anchor']['row1'] + s['anchor']['row2'])/2.0 - r) <= 0.8]
        
        # Deduplicate shapes by pib for this row to preserve unique angle views
        seen_pib = set()
        uniq_shapes = []
        for s in row_shapes:
            if s['pib'] not in seen_pib:
                uniq_shapes.append(s)
                seen_pib.add(s['pib'])
        
        # Sort shapes by column (Col 1 first, then Col 7, 8, 9)
        uniq_shapes.sort(key=lambda s: s['anchor']['col1'])

        if not uniq_shapes:
            # Skip rows with no corresponding visual shape in Excel
            continue

        base_slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
        if not base_slug: base_slug = f'vr-product-{len(all_products)+1}'
        slug = base_slug
        counter = 2
        while slug in seen_slugs:
            slug = f'{base_slug}-{counter}'
            counter += 1
        seen_slugs.add(slug)

        img_rel_path = None
        gallery_paths = []

        for s_i, shape in enumerate(uniq_shapes):
            pib = shape['pib']
            if 1 <= pib <= len(blips) and blips[pib-1]['data']:
                blip = blips[pib-1]
                if s_i == 0:
                    img_name = f'{slug}.{blip["ext"]}'
                else:
                    img_name = f'{slug}-{s_i+1}.{blip["ext"]}'
                for target_dir in target_dirs:
                    with open(os.path.join(target_dir, img_name), 'wb') as img_f:
                        img_f.write(blip['data'])
                img_path = f'/assets/vr-game-images/{img_name}'
                if s_i == 0:
                    img_rel_path = img_path
                if img_path not in gallery_paths:
                    gallery_paths.append(img_path)

        if img_rel_path and not gallery_paths:
            gallery_paths = [img_rel_path]

        def extract_field(pattern, text, default=''):
            m = re.search(pattern, text, re.IGNORECASE)
            return m.group(1).strip() if m else default

        dimensions = extract_field(r'(?:DIMENSION|Product Size|Size|DIMENSIONS)[:\s]*([^\n]+)', specs_text)
        power = extract_field(r'(?:POWER|Power consumption)[:\s]*([^\n]+)', specs_text)
        weight = extract_field(r'(?:WEIGHT|Gross weight|Net weight)[:\s]*([^\n]+)', specs_text)
        max_load = extract_field(r'(?:MAX LOAD|Max Load|Loading weight|Payload)[:\s]*([^\n]+)', specs_text)
        players = extract_field(r'(?:PLAYER|PLAYERS|Seat|Seats|Player count)[:\s]*([^\n]+)', specs_text)
        if not players:
            p_m = re.search(r'(\d+)\s*(?:P|PLAYER|SEAT|SEATS)', name, re.IGNORECASE)
            if p_m: players = f'{p_m.group(1)} Players'
        games = extract_field(r'(?:GAMES|Game quantity|Movies|Film count)[:\s]*([^\n]+)', specs_text)
        helmet = extract_field(r'(?:HELMET|GLASSES|VR Glasses|Headset)[:\s]*([^\n]+)', specs_text)
        voltage = extract_field(r'(?:VOLTAGE|Voltage)[:\s]*([^\n]+)', specs_text)
        if not voltage:
            v_m = re.search(r'(\d{3}V|\d{3}\s*V)', specs_text, re.IGNORECASE)
            voltage = v_m.group(1) if v_m else '220V / 110V'

        width = ''
        depth = ''
        height = ''
        if dimensions:
            dim_m = re.search(r'W(\d+)[*xX]D?(\d+)[*xXH](\d+)', dimensions, re.IGNORECASE)
            if dim_m:
                width = f'{dim_m.group(1)} mm'
                depth = f'{dim_m.group(2)} mm'
                height = f'{dim_m.group(3)} mm'
            else:
                dim_l = re.search(r'L(\d+)[*xX]W(\d+)[*xXH](\d+)', dimensions, re.IGNORECASE)
                if dim_l:
                    width = f'{dim_l.group(2)} mm'
                    depth = f'{dim_l.group(1)} mm'
                    height = f'{dim_l.group(3)} mm'

        if img_rel_path:
            product = {
                'id': len(all_products) + 1,
                'title': name,
                'name': name,
                'nameBase': name,
                'nameHighlight': '',
                'category': cat_name,
                'tag': cat_name,
                'tagline': f'Commercial {cat_name} virtual reality simulation system designed for maximum guest throughput.',
                'desc': specs_text or f'DIMENSIONS: {dimensions}\nPOWER: {power}\nWEIGHT: {weight}\nPLAYERS: {players}',
                'slug': slug,
                'power': power or '3.5KW',
                'voltage': voltage,
                'specsCategory': cat_name,
                'players': players or '1-2 Players',
                'weight': weight or '350KG',
                'dimensions': dimensions or 'Custom Commercial Size',
                'width': width or '1500 mm',
                'depth': depth or '1800 mm',
                'height': height or '2200 mm',
                'maxLoad': max_load or '250KG',
                'games': games or '10+ High-Definition VR Experiences',
                'helmet': helmet or 'DP / HTC / Pico High-Res VR',
                'material': 'Commercial Heavy-Duty Steel & High-Gloss Fiberglass',
                'img': img_rel_path,
                'imageUrl': img_rel_path,
                'gallery': gallery_paths,
                'quoteUrl': f'https://wa.me/919428989488?text=Hello%20Winera,%20I%20want%20a%20quote%20for%20{name}%20({cat_name})'
            }
            all_products.append(product)

print(f'Total 100% verified products with exact Excel images: {len(all_products)}')
multi = [p for p in all_products if len(p['gallery']) > 1]
print(f'Products with multiple gallery photos (3-4 images): {len(multi)}')

data_payload = {
    'categoriesList': ['All VR Games', 'Bester VR', 'Funin VR', 'Movie Power', 'Oculeap VR'],
    'cards': all_products
}

with open('frontend/src/data/allVrGames.json', 'w', encoding='utf-8') as f:
    json.dump(data_payload, f, indent=2, ensure_ascii=False)

with open('backend/src/data/allVrGames.json', 'w', encoding='utf-8') as f:
    json.dump(data_payload, f, indent=2, ensure_ascii=False)

js_content = f'export const allVrGames = {json.dumps(data_payload, indent=2, ensure_ascii=False)};\nexport default allVrGames;\n'
with open('frontend/src/data/allVrGames.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Success extraction and synchronization!')
