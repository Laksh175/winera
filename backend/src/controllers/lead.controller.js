import Lead from '../models/Lead.js';
import Content from '../models/Content.js';

// Create a new lead inquiry (Public Endpoint)
export const createLead = async (req, res) => {
  try {
    const { name, countryCode = '+91', phone, pageSource = 'General Website', pageUrl = '/' } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone number are required'
      });
    }

    const fullPhone = `${countryCode} ${phone}`.trim();

    // 1. Save Lead to MongoDB
    const lead = await Lead.create({
      name,
      countryCode,
      phone,
      fullPhone,
      pageSource,
      pageUrl,
      createdAt: new Date()
    });

    // 2. Trigger Google Sheets Sync via Webhook (if URL configured in CMS Content)
    try {
      const contentDoc = await Content.findOne({ key: 'siteData' });
      const webhookUrl = contentDoc?.data?.leadSettings?.googleSheetWebhookUrl || contentDoc?.data?.googleSheetWebhookUrl;

      if (webhookUrl && webhookUrl.startsWith('http')) {
        // Send payload asynchronously to Google Apps Script Webhook
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            countryCode,
            phone,
            fullPhone,
            pageSource,
            pageUrl,
            createdAt: lead.createdAt.toISOString()
          })
        }).catch(err => console.error('Google Sheet Webhook Sync Error:', err.message));
      }
    } catch (sheetErr) {
      console.error('Failed to trigger Google Sheet webhook:', sheetErr);
    }

    return res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: lead
    });
  } catch (error) {
    console.error('Create Lead Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error.message
    });
  }
};

// Get all leads (Admin Protected)
export const getLeads = async (req, res) => {
  try {
    const { search, pageSource, startDate, endDate, page = 1, limit = 100 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { fullPhone: { $regex: search, $options: 'i' } }
      ];
    }

    if (pageSource && pageSource !== 'All') {
      query.pageSource = pageSource;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalLeads = await Lead.countDocuments(query);
    const distinctPages = await Lead.distinct('pageSource');

    return res.status(200).json({
      success: true,
      totalLeads,
      totalPages: Math.ceil(totalLeads / parseInt(limit)),
      currentPage: parseInt(page),
      distinctPages,
      leads
    });
  } catch (error) {
    console.error('Get Leads Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leads',
      error: error.message
    });
  }
};

// Delete single lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Lead deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete lead',
      error: error.message
    });
  }
};

// Bulk delete leads
export const bulkDeleteLeads = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No lead IDs provided for deletion'
      });
    }

    const result = await Lead.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} leads deleted successfully`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to bulk delete leads',
      error: error.message
    });
  }
};

// Update lead status
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

    return res.status(200).json({
      success: true,
      message: 'Lead status updated',
      data: lead
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update lead status',
      error: error.message
    });
  }
};
