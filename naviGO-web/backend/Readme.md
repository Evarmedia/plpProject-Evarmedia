Backend for NaviGo

Technologies:
Node
Mysql
Sequelize

Dependencies:
npm install express
npm install mysql2
npm install sequelize
npm install sequelize-cli
npm install dotenv
npm install bcryptjs
npm install jsonwebtoken
npm install cors
npm install express-validator
npm install body-parser
npm install --save-dev nodemon
npm install eslint --save-dev
npm install morgan

npm install --save-dev jest supertest


1. API Endpoints
1. User Authentication
Registration (POST /auth/register): Register users (admin, donor, community manager) with their roles.
Login (POST /auth/login): Authenticate users and return a JWT token.
Authorization Middleware: Use JWT tokens to protect role-specific routes.

2. Community Manager Functionality
View Incoming Donations (GET /community/:communityId/donations):
Community managers can view all donations directed to their community.
Returns donations filtered by community_id.
Update Donation Status (PATCH /donation/:donationId/status):
Community managers can update the status of a donation as "received" or "not_received".
Request Body: { "status": "received" or "not_received" }

3. Admin Functionality
Add New Donation (POST /donations):

View All Donations (GET /donations):

Manage Communities:
Create Community (POST /communities): Create a new community and assign a manager.
View Communities (GET /communities): View all communities with details (location, manager).
Assign Community Manager (PATCH /community/:communityId/assign-manager): Reassign a community manager.

4. Donor Functionality
Login
Make a Donation (POST /donations):
Donors can make a donation by specifying the item name, type (monetary or in-kind), quantity, and community.

View Donation History (GET /donations/user):
Donors can view the donations they’ve made, filtered by user_id.

5. General Functionality
View Donations (GET /donations):
Admin can view donations across all communities.
2. Authentication and Authorization Flow
Role-Based Access Control:
Community managers can access donation lists and update donation statuses for their communities.
Admins can manage all donations and community managers.
Donors can make donations and view their donation history.

3. Error Handling
404 Not Found: If a community, user, or donation is not found.
401 Unauthorized: For restricted routes without valid tokens.
400 Bad Request: For invalid input or malformed requests.