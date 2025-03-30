import json
import pytest
import sys
import os

# Insert the project root directory so that "server" becomes importable.
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from server.app import app  # Now this should work.



@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_api_smile_no_smile(client):
    # Call the endpoint and expect an error message if no smile is detected
    response = client.get("/api/smile")
    data = json.loads(response.data)
    assert response.status_code in (200, 404)  # Depending on your logic
    if response.status_code == 404:
        assert "error" in data

def test_video_feed(client):
    # Test that the video_feed endpoint returns a stream (status code 200)
    response = client.get("/video_feed")
    assert response.status_code == 200
    # Optionally, check that the response content type is as expected.
    assert "multipart/x-mixed-replace" in response.content_type
