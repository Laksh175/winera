<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Winera International</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            padding: 30px 20px;
            line-height: 1.5;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
            border: 1px solid #e2e8f0;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            padding: 36px 32px;
          }
          .header h1 {
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
          }
          .header p {
            font-size: 14px;
            opacity: 0.9;
            max-width: 700px;
          }
          .controls {
            padding: 24px 32px;
            background: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
            align-items: center;
            justify-content: space-between;
          }
          .search-box {
            flex: 1;
            min-width: 260px;
          }
          .search-input {
            width: 100%;
            padding: 10px 16px;
            font-size: 14px;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            background: #ffffff;
          }
          .search-input:focus {
            border-color: #0284c7;
          }
          .filter-dropdown {
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 600;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            outline: none;
            background: #ffffff;
            cursor: pointer;
          }
          .stats-bar {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 16px 32px;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
          }
          .badge-btn {
            padding: 8px 16px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 20px;
            border: 1.5px solid transparent;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #f1f5f9;
            color: #475569;
          }
          .badge-btn:hover, .badge-btn.active {
            background: #0284c7;
            color: #ffffff;
          }
          .accordion-section {
            border-bottom: 1px solid #e2e8f0;
          }
          .accordion-header {
            padding: 18px 32px;
            background: #ffffff;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            user-select: none;
            font-weight: 700;
            font-size: 16px;
            transition: background 0.15s ease;
          }
          .accordion-header:hover {
            background: #f8fafc;
          }
          .accordion-header .title-left {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .accordion-header .arrow {
            font-size: 14px;
            transition: transform 0.2s ease;
            color: #0284c7;
          }
          .accordion-header.collapsed .arrow {
            transform: rotate(-90deg);
          }
          .count-pill {
            font-size: 12px;
            padding: 3px 10px;
            border-radius: 12px;
            background: #e0f2fe;
            color: #0369a1;
            font-weight: 800;
          }
          .accordion-content {
            padding: 0 32px 24px 32px;
            display: block;
          }
          .accordion-header.collapsed + .accordion-content {
            display: none;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
          }
          th {
            text-align: left;
            padding: 12px 14px;
            background: #f8fafc;
            color: #475569;
            font-weight: 700;
            border-bottom: 1.5px solid #e2e8f0;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td {
            padding: 12px 14px;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          a.url-link {
            color: #0284c7;
            text-decoration: none;
            word-break: break-all;
            font-weight: 500;
          }
          a.url-link:hover {
            text-decoration: underline;
            color: #0369a1;
          }
          .tag {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
          }
          .tag-page { background: #e0f2fe; color: #0369a1; }
          .tag-blog { background: #fef3c7; color: #b45309; }
          .tag-project { background: #dcfce7; color: #15803d; }
          .tag-product { background: #f3e8ff; color: #7e22ce; }
          .tag-sitemap { background: #fee2e2; color: #b91c1c; }
          .footer-note {
            padding: 20px 32px;
            font-size: 12px;
            color: #64748b;
            background: #f8fafc;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap Index &amp; Directory</h1>
            <p>Winera International commercial entertainment &amp; gaming equipment. Organized by Category Dropdowns for SEO search engines and visitors.</p>
          </div>

          <div class="controls">
            <div class="search-box">
              <input type="text" id="searchInput" class="search-input" placeholder="🔍 Search URL, slug, or title..." onkeyup="filterUrls()" />
            </div>
            <div>
              <select id="sectionSelector" class="filter-dropdown" onchange="selectSection(this.value)">
                <option value="all">📂 View All Sections</option>
                <option value="sec-pages">📄 Pages Dropdown</option>
                <option value="sec-blogs">📖 Blogs Dropdown</option>
                <option value="sec-projects">🏗️ Projects Dropdown</option>
                <option value="sec-products">🎮 Products Dropdown</option>
              </select>
            </div>
          </div>

          <div class="stats-bar">
            <button class="badge-btn active" onclick="selectSection('all')">All URLs</button>
            <button class="badge-btn" onclick="selectSection('sec-pages')">📄 Pages (<span id="pagesBadge">0</span>)</button>
            <button class="badge-btn" onclick="selectSection('sec-blogs')">📖 Blogs (<span id="blogsBadge">0</span>)</button>
            <button class="badge-btn" onclick="selectSection('sec-projects')">🏗️ Projects (<span id="projectsBadge">0</span>)</button>
            <button class="badge-btn" onclick="selectSection('sec-products')">🎮 Products (<span id="productsBadge">0</span>)</button>
          </div>

          <!-- SECTION 1: PAGES DROPDOWN -->
          <div class="accordion-section" id="sec-pages">
            <div class="accordion-header" onclick="toggleAccordion('sec-pages')">
              <div class="title-left">
                <span class="arrow">▼</span>
                <span>📄 Website Main Pages &amp; Categories</span>
                <span class="count-pill" id="pagesCount">19</span>
              </div>
              <span style="font-size:12px; color:#64748b; font-weight:500;">Click to open/close dropdown</span>
            </div>
            <div class="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">Page URL</th>
                    <th>Category</th>
                    <th>Last Modified</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody id="pagesTbody">
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <xsl:variable name="loc" select="sitemap:loc" />
                    <xsl:if test="not(contains($loc, '/blog/')) and not(contains($loc, '/project/')) and (not(contains($loc, '/product/')) or contains($loc, '/product/arcade-games') or contains($loc, '/product/vr-games') or contains($loc, '/product/ar-games') or contains($loc, '/product/bowling-alley') or contains($loc, '/product/trampoline-park') or contains($loc, '/product/soft-play') or contains($loc, '/product/bumper-car') or contains($loc, '/product/hypergrid') or contains($loc, '/product/amusement-park') or contains($loc, '/product/laser-tag'))">
                      <tr class="url-row" data-url="{$loc}">
                        <td><a href="{$loc}" class="url-link" target="_blank"><xsl:value-of select="$loc"/></a></td>
                        <td><span class="tag tag-page">Page</span></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                        <td><xsl:value-of select="sitemap:changefreq"/></td>
                        <td><xsl:value-of select="sitemap:priority"/></td>
                      </tr>
                    </xsl:if>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SECTION 2: BLOGS DROPDOWN -->
          <div class="accordion-section" id="sec-blogs">
            <div class="accordion-header" onclick="toggleAccordion('sec-blogs')">
              <div class="title-left">
                <span class="arrow">▼</span>
                <span>📖 Blog Articles</span>
                <span class="count-pill" id="blogsCount">28</span>
              </div>
              <span style="font-size:12px; color:#64748b; font-weight:500;">Click to open/close dropdown</span>
            </div>
            <div class="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">Blog Article URL</th>
                    <th>Category</th>
                    <th>Last Modified</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody id="blogsTbody">
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <xsl:variable name="loc" select="sitemap:loc" />
                    <xsl:if test="contains($loc, '/blog/')">
                      <tr class="url-row" data-url="{$loc}">
                        <td><a href="{$loc}" class="url-link" target="_blank"><xsl:value-of select="$loc"/></a></td>
                        <td><span class="tag tag-blog">Blog</span></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                        <td><xsl:value-of select="sitemap:changefreq"/></td>
                        <td><xsl:value-of select="sitemap:priority"/></td>
                      </tr>
                    </xsl:if>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SECTION 3: PROJECTS DROPDOWN -->
          <div class="accordion-section" id="sec-projects">
            <div class="accordion-header" onclick="toggleAccordion('sec-projects')">
              <div class="title-left">
                <span class="arrow">▼</span>
                <span>🏗️ Case Studies &amp; Projects</span>
                <span class="count-pill" id="projectsCount">13</span>
              </div>
              <span style="font-size:12px; color:#64748b; font-weight:500;">Click to open/close dropdown</span>
            </div>
            <div class="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">Project Detail URL</th>
                    <th>Category</th>
                    <th>Last Modified</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody id="projectsTbody">
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <xsl:variable name="loc" select="sitemap:loc" />
                    <xsl:if test="contains($loc, '/project/')">
                      <tr class="url-row" data-url="{$loc}">
                        <td><a href="{$loc}" class="url-link" target="_blank"><xsl:value-of select="$loc"/></a></td>
                        <td><span class="tag tag-project">Project</span></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                        <td><xsl:value-of select="sitemap:changefreq"/></td>
                        <td><xsl:value-of select="sitemap:priority"/></td>
                      </tr>
                    </xsl:if>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SECTION 4: PRODUCTS DROPDOWN -->
          <div class="accordion-section" id="sec-products">
            <div class="accordion-header" onclick="toggleAccordion('sec-products')">
              <div class="title-left">
                <span class="arrow">▼</span>
                <span>🎮 Arcade &amp; VR Game Products</span>
                <span class="count-pill" id="productsCount">1038</span>
              </div>
              <span style="font-size:12px; color:#64748b; font-weight:500;">Click to open/close dropdown</span>
            </div>
            <div class="accordion-content">
              <table>
                <thead>
                  <tr>
                    <th style="width: 50%;">Product Detail URL</th>
                    <th>Category</th>
                    <th>Last Modified</th>
                    <th>Change Frequency</th>
                    <th>Priority</th>
                  </tr>
                </thead>
                <tbody id="productsTbody">
                  <xsl:for-each select="sitemap:urlset/sitemap:url">
                    <xsl:variable name="loc" select="sitemap:loc" />
                    <xsl:if test="contains($loc, '/product/') and not(contains($loc, '/product/arcade-games')) and not(contains($loc, '/product/vr-games')) and not(contains($loc, '/product/ar-games')) and not(contains($loc, '/product/bowling-alley')) and not(contains($loc, '/product/trampoline-park')) and not(contains($loc, '/product/soft-play')) and not(contains($loc, '/product/bumper-car')) and not(contains($loc, '/product/hypergrid')) and not(contains($loc, '/product/amusement-park')) and not(contains($loc, '/product/laser-tag'))">
                      <tr class="url-row" data-url="{$loc}">
                        <td><a href="{$loc}" class="url-link" target="_blank"><xsl:value-of select="$loc"/></a></td>
                        <td><span class="tag tag-product">Product</span></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                        <td><xsl:value-of select="sitemap:changefreq"/></td>
                        <td><xsl:value-of select="sitemap:priority"/></td>
                      </tr>
                    </xsl:if>
                  </xsl:for-each>
                </tbody>
              </table>
            </div>
          </div>

          <!-- SITEMAP INDEX FALLBACK IF DOCUMENT IS SITEMAPINDEX -->
          <xsl:if test="sitemap:sitemapindex/sitemap:sitemap">
            <div class="accordion-section" id="sec-sitemaps">
              <div class="accordion-header" onclick="toggleAccordion('sec-sitemaps')">
                <div class="title-left">
                  <span class="arrow">▼</span>
                  <span>📑 Category Sub-Sitemaps</span>
                  <span class="count-pill"><xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"/></span>
                </div>
                <span style="font-size:12px; color:#64748b; font-weight:500;">Click to open/close</span>
              </div>
              <div class="accordion-content">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 60%;">Sitemap File URL</th>
                      <th>Type</th>
                      <th>Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td><a href="{sitemap:loc}" class="url-link"><xsl:value-of select="sitemap:loc"/></a></td>
                        <td><span class="tag tag-sitemap">Sitemap Index</span></td>
                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </div>
          </xsl:if>

          <div class="footer-note">
            Generated automatically by Winera SEO Engine • Compatible with Google Search Console, Bing, and AI crawlers
          </div>
        </div>

        <script type="text/javascript">
          function toggleAccordion(id) {
            const sec = document.getElementById(id);
            if (!sec) return;
            const header = sec.querySelector('.accordion-header');
            if (header) {
              header.classList.toggle('collapsed');
            }
          }

          function selectSection(id) {
            const sections = ['sec-pages', 'sec-blogs', 'sec-projects', 'sec-products'];
            const selectEl = document.getElementById('sectionSelector');
            if (selectEl) selectEl.value = id;

            document.querySelectorAll('.badge-btn').forEach(btn => btn.classList.remove('active'));

            if (id === 'all') {
              sections.forEach(sId => {
                const sec = document.getElementById(sId);
                if (sec) {
                  sec.style.display = 'block';
                  const header = sec.querySelector('.accordion-header');
                  if (header) header.classList.remove('collapsed');
                }
              });
              const allBtn = document.querySelector('.badge-btn');
              if (allBtn) allBtn.classList.add('active');
            } else {
              sections.forEach(sId => {
                const sec = document.getElementById(sId);
                if (sec) {
                  if (sId === id) {
                    sec.style.display = 'block';
                    const header = sec.querySelector('.accordion-header');
                    if (header) header.classList.remove('collapsed');
                  } else {
                    sec.style.display = 'none';
                  }
                }
              });
            }
          }

          function filterUrls() {
            const filter = document.getElementById('searchInput').value.toLowerCase();
            const rows = document.querySelectorAll('.url-row');
            rows.forEach(row => {
              const url = (row.getAttribute('data-url') || '').toLowerCase();
              if (url.includes(filter)) {
                row.style.display = '';
              } else {
                row.style.display = 'none';
              }
            });
          }

          window.addEventListener('DOMContentLoaded', () => {
            const pagesRows = document.querySelectorAll('#pagesTbody tr').length;
            const blogsRows = document.querySelectorAll('#blogsTbody tr').length;
            const projectsRows = document.querySelectorAll('#projectsTbody tr').length;
            const productsRows = document.querySelectorAll('#productsTbody tr').length;

            if (document.getElementById('pagesCount')) document.getElementById('pagesCount').textContent = pagesRows;
            if (document.getElementById('pagesBadge')) document.getElementById('pagesBadge').textContent = pagesRows;
            if (document.getElementById('blogsCount')) document.getElementById('blogsCount').textContent = blogsRows;
            if (document.getElementById('blogsBadge')) document.getElementById('blogsBadge').textContent = blogsRows;
            if (document.getElementById('projectsCount')) document.getElementById('projectsCount').textContent = projectsRows;
            if (document.getElementById('projectsBadge')) document.getElementById('projectsBadge').textContent = projectsRows;
            if (document.getElementById('productsCount')) document.getElementById('productsCount').textContent = productsRows;
            if (document.getElementById('productsBadge')) document.getElementById('productsBadge').textContent = productsRows;
          });
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
