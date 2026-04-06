# Postman API Documentation Guide — AgriculNet

A step-by-step guide to documenting AgriculNet endpoints in Postman.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Importing Collections](#importing-collections)
3. [Documenting a New Endpoint](#documenting-a-new-endpoint)
4. [Collection Structure Standards](#collection-structure-standards)
5. [Writing Documentation](#writing-documentation)
6. [Testing & Validation](#testing--validation)
7. [Exporting & Saving](#exporting--saving)

---

## Prerequisites

- Postman installed (desktop or web)
- Access to AgriculNet repository
- Local server running on `http://localhost:5000`

---

## Importing Collections

### Step 1: Open Postman
Launch Postman and ensure you're signed in to save collections to the workspace.

### Step 2: Import Existing Collections
1. Click **Import** (top-left)
2. Select **File** → Upload these files from `postman/` folder:
   - `agriculnet.postman_environment.json`
   - `agriculnet_auth.postman_collection.json`
   - `agriculnet_listings.postman_collection.json`
   - `agriculnet_orders.postman_collection.json`
3. Click **Import**

### Step 3: Set Up Environment
1. Click **Environments** (left sidebar)
2. Select **AgriculNet Environment**
3. Set initial values:
   - `base_url`: `http://localhost:5000`
   - `api_version`: `v1`
   - Leave tokens empty (they auto-populate on login)

---

## Documenting a New Endpoint

### Example: Adding a "Create Listing" Endpoint

#### Step 1: Create Request
1. Select the **Listings** collection
2. Click **Add Request**
3. Name it: `Create Listing`
4. Method: `POST`
5. URL: `{{base_url}}/api/{{api_version}}/listings`

#### Step 2: Configure Headers
```
Content-Type: application/json
Authorization: Bearer {{access_token}}
```

#### Step 3: Add Request Body (JSON)
```json
{
  "cropName": "Cassava",
  "variety": "Sweet White",
  "quantity": 500,
  "unit": "kg",
  "pricePerUnit": 350,
  "currency": "XAF",
  "location": {
    "region": "South West",
    "city": "Kumba"
  },
  "harvestDate": "2025-03-15",
  "availableDate": "2025-03-20",
  "qualityGrade": "A",
  "certifications": ["Organic"],
  "description": "Premium organic cassava from Green Valley Farm"
}
```

#### Step 4: Add Tests (Scripts Tab)
```javascript
pm.test("Status 201 - Created", () => {
    pm.response.to.have.status(201);
});

pm.test("Response has listing ID", () => {
    const json = pm.response.json();
    pm.expect(json.data).to.have.property('id');
    pm.collectionVariables.set('listing_id', json.data.id);
});

pm.test("Success flag is true", () => {
    pm.expect(pm.response.json().success).to.be.true;
});
```

#### Step 5: Save to Collection
Click **Save** → Select **AgriculNet API — Listings** → Choose/create folder (e.g., `Farmer Listings`)

---

## Collection Structure Standards

Maintain this folder hierarchy for consistency:

```
AgriculNet API — [Module]
├── Health Check
├── [Feature Group]
│   ├── List [Items]
│   ├── Get [Item] by ID
│   ├── Create [Item]
│   ├── Update [Item]
│   └── Delete [Item]
└── [Another Feature Group]
```

### Naming Conventions
- **Requests**: Use action + resource (e.g., `Create Listing`, `Get Order by ID`)
- **Folders**: Group by feature or user role
- **Variables**: Use lowercase with underscores (e.g., `access_token`, `farmer_id`)

---

## Writing Documentation

### Step 1: Document the Request
1. Click the **Documentation** icon (ⓘ) on the request
2. Add description covering:
   - What this endpoint does
   - Who can access it (roles/permissions)
   - Rate limits (if any)

Example:
```markdown
## Create Listing
Creates a new crop listing for farmers.

**Authentication:** Required (Bearer Token)  
**Roles:** Farmer only  
**Rate Limit:** 10 requests/minute

### Request Body
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| cropName | string | Yes | Name of the crop |
| quantity | number | Yes | Amount available |
| unit | string | Yes | kg, tonnes, bags |
| pricePerUnit | number | Yes | Price in XAF |
```

### Step 2: Document the Collection
1. Click the **ⓘ** next to collection name
2. Add overview:
   - API version
   - Base URL
   - Authentication method
   - Contact/support info

---

## Testing & Validation

### Run Collection Tests
1. Click **Runner** (or right-click collection → **Run Collection**)
2. Select environment: **AgriculNet Environment**
3. Click **Run**
4. Review pass/fail status for each test

### Common Test Patterns
```javascript
// Status code check
pm.test("Status 200", () => pm.response.to.have.status(200));

// Response time check
pm.test("Response time < 500ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Schema validation
pm.test("Response structure valid", () => {
    const json = pm.response.json();
    pm.expect(json).to.have.property('success');
    pm.expect(json).to.have.property('data');
    pm.expect(json).to.have.property('message');
});

// Set variables from response
pm.test("Store token", () => {
    const token = pm.response.json().data.accessToken;
    pm.collectionVariables.set('access_token', token);
});
```

---

## Exporting & Saving

### Step 1: Export Collections
1. Right-click collection → **Export**
2. Choose **Collection v2.1**
3. Save to `postman/` folder with naming pattern:
   - `agriculnet_[module].postman_collection.json`

### Step 2: Export Environment
1. Click **Environments** → **...** menu → **Export**
2. Save as: `agriculnet.postman_environment.json`

### Step 3: Git Commit
```bash
git add postman/
git commit -m "docs(postman): update API collections with [module] endpoints"
git push origin main
```

---

## Quick Reference: Variable Mapping

| Variable | Set By | Used In |
|----------|--------|---------|
| `base_url` | Environment | All requests |
| `api_version` | Environment | All requests |
| `access_token` | Login response | Authenticated requests |
| `refresh_token` | Login response | Token refresh, logout |
| `farmer_id` | Register Farmer | Farmer-specific endpoints |
| `buyer_id` | Register Buyer | Buyer-specific endpoints |
| `listing_id` | Create Listing | Listing operations |
| `order_id` | Create Order | Order operations |

---

## Checklist for New Endpoints

- [ ] Request method correct (GET/POST/PATCH/DELETE)
- [ ] URL uses variables (`{{base_url}}`, `{{api_version}}`)
- [ ] Headers include `Content-Type` and `Authorization` (if needed)
- [ ] Body contains valid JSON with example data
- [ ] Tests validate status code and response structure
- [ ] Documentation describes purpose and parameters
- [ ] Collection exported and saved to `postman/` folder
- [ ] Git commit with descriptive message

---

## Current Status

| Collection | Status | Coverage |
|------------|--------|----------|
| Authentication | Complete | 15 endpoints |
| Listings | Empty | Awaiting implementation |
| Orders | Empty | Awaiting implementation |
| Farmers | Not created | Awaiting implementation |
| Buyers | Not created | Awaiting implementation |

---

**Next Steps:** Once backend routes are implemented in `server/src/modules/`, follow this guide to populate the empty collections.
