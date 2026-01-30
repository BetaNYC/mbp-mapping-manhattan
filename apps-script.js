/**
 * BetaNYC Community Mapping - Google Apps Script Backend
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create a new Google Sheet (this will store your responses)
 * 
 * 2. In the Sheet, add these column headers in Row 1:
 *    A: Timestamp
 *    B: Latitude
 *    C: Longitude
 *    D: Map Type
 *    E: Pin Type
 *    F: Story
 *    G: Name
 *    H: Email
 * 
 * 3. Go to Extensions → Apps Script
 * 
 * 4. Delete any existing code and paste this entire file
 * 
 * 5. Click "Deploy" → "New deployment"
 * 
 * 6. Click the gear icon next to "Select type" and choose "Web app"
 * 
 * 7. Set the following:
 *    - Description: "BetaNYC Map Form Handler" (or whatever you like)
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 
 * 8. Click "Deploy"
 * 
 * 9. Authorize the app when prompted (you'll need to click through security warnings)
 * 
 * 10. Copy the Web app URL - this is your APPS_SCRIPT_URL for the HTML form
 * 
 * NOTE: If you make changes to this script, you'll need to create a NEW deployment
 * for the changes to take effect (Deploy → New deployment)
 */

// Handle POST requests from the form
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Format the timestamp for readability
    const timestamp = data.timestamp 
      ? new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/New_York' })
      : new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    
    // Append the row to the sheet
    sheet.appendRow([
      timestamp,
      data.latitude,
      data.longitude,
      data.mapType,
      data.pinType,
      data.story,
      data.name || '',
      data.email || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (useful for testing the deployment)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'BetaNYC Map Form Handler is running. Use POST to submit data.' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Test function you can run manually to verify the sheet is set up
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = sheet.getRange(1, 1, 1, 8).getValues()[0];
  
  const expectedHeaders = ['Timestamp', 'Latitude', 'Longitude', 'Map Type', 'Pin Type', 'Story', 'Name', 'Email'];
  
  Logger.log('Current headers: ' + headers.join(', '));
  Logger.log('Expected headers: ' + expectedHeaders.join(', '));
  
  // Check if headers match
  let allMatch = true;
  for (let i = 0; i < expectedHeaders.length; i++) {
    if (headers[i] !== expectedHeaders[i]) {
      allMatch = false;
      Logger.log('Mismatch at column ' + (i + 1) + ': expected "' + expectedHeaders[i] + '", got "' + headers[i] + '"');
    }
  }
  
  if (allMatch) {
    Logger.log('✓ Sheet is set up correctly!');
  } else {
    Logger.log('✗ Please update your headers to match the expected format.');
  }
}
