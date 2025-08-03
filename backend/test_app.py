# import unittest
# import json
# from app import app

# class UserManagementTestCase(unittest.TestCase):
#     def setUp(self):
#         self.client = app.test_client()
#         self.headers = {"Content-Type": "application/json"}

#     def test_create_user_success(self):
#         response = self.client.post(
#             "/create-user",
#             data=json.dumps({
#                 "name": "Test User",
#                 "email": "testuser@example.com",
#                 "password": "testpass"
#             }),
#             headers=self.headers
#         )
#         self.assertEqual(response.status_code, 201)

#     def test_create_user_duplicate_email(self):
#         # Try creating the same user again
#         response = self.client.post(
#             "/create-user",
#             data=json.dumps({
#                 "name": "Test User",
#                 "email": "testuser@example.com",
#                 "password": "testpass"
#             }),
#             headers=self.headers
#         )
#         self.assertIn(response.status_code, [400, 409])

#     def test_login_user_success(self):
#         response = self.client.post(
#             "/login",
#             data=json.dumps({
#                 "email": "testuser@example.com",
#                 "password": "testpass"
#             }),
#             headers=self.headers
#         )
#         self.assertEqual(response.status_code, 200)
#         self.assertIn("token", response.get_json())

#     def test_login_user_invalid_credentials(self):
#         response = self.client.post(
#             "/login",
#             data=json.dumps({
#                 "email": "wrong@example.com",
#                 "password": "wrongpass"
#             }),
#             headers=self.headers
#         )
#         self.assertEqual(response.status_code, 401)

#     def test_get_user_by_invalid_id(self):
#         response = self.client.get("/user/9999")
#         self.assertEqual(response.status_code, 404)

# if __name__ == "__main__":
#     unittest.main()


# #########################################



import unittest
import json
from app import app

class UserManagementTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.headers = {"Content-Type": "application/json"}
        # Create a test user (you can safely recreate since email is unique)
        self.client.post(
            "/create-user",
            data=json.dumps({
                "name": "Test User",
                "email": "testuser@example.com",
                "password": "testpass"
            }),
            headers=self.headers
        )

    def test_create_user_success(self):
        response = self.client.post(
            "/create-user",
            data=json.dumps({
                "name": "New User",
                "email": "newuser@example.com",
                "password": "newpass"
            }),
            headers=self.headers
        )
        self.assertEqual(response.status_code, 201)

    def test_create_user_duplicate_email(self):
        response = self.client.post(
            "/create-user",
            data=json.dumps({
                "name": "Test User",
                "email": "testuser@example.com",
                "password": "testpass"
            }),
            headers=self.headers
        )
        self.assertIn(response.status_code, [400, 409])

    def test_login_success(self):
        response = self.client.post(
            "/login",
            data=json.dumps({
                "email": "testuser@example.com",
                "password": "testpass"
            }),
            headers=self.headers
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("token", data)
        self.token = data["token"]

    def test_login_invalid_credentials(self):
        response = self.client.post(
            "/login",
            data=json.dumps({
                "email": "wrong@example.com",
                "password": "wrongpass"
            }),
            headers=self.headers
        )
        self.assertEqual(response.status_code, 401)

    def test_get_user_by_invalid_id(self):
        response = self.client.get("/user/9999")
        self.assertEqual(response.status_code, 404)

    def test_update_user(self):
        # Get ID of existing user
        response = self.client.get("/search?name=Test User")
        user_data = response.get_json()
        if not user_data:
            self.skipTest("No users found")
        user_id = user_data[0]['id']

        update_response = self.client.put(
            f"/user/{user_id}",
            data=json.dumps({
                "name": "Updated User",
                "email": "testuser@example.com",
                "password": "updatedpass"
            }),
            headers=self.headers
        )
        self.assertEqual(update_response.status_code, 200)

    def test_delete_user(self):
        # Create then delete a user
        create_response = self.client.post(
            "/create-user",
            data=json.dumps({
                "name": "Delete User",
                "email": "delete@example.com",
                "password": "pass"
            }),
            headers=self.headers
        )
        self.assertEqual(create_response.status_code, 201)

        search_response = self.client.get("/search?name=Delete User")
        user = search_response.get_json()[0]
        user_id = user['id']

        delete_response = self.client.delete(f"/user/{user_id}")
        self.assertEqual(delete_response.status_code, 200)

        confirm_response = self.client.get(f"/user/{user_id}")
        self.assertEqual(confirm_response.status_code, 404)

    def test_search_by_name(self):
        response = self.client.get("/search?name=Test")
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIsInstance(data, list)

if __name__ == "__main__":
    unittest.main()
