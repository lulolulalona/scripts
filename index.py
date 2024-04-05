import requests

def send_request_and_get_response():
    url = 'https://example.com'  # URL of the website you want to send the request to
    response = requests.get(url)
    
    # Check if the request was successful
    if response.status_code == 200:
        return response.text  # Return the response content
    else:
        return f"Error: {response.status_code}"  # Return an error message if the request was not successful

# Example usage
response_content = send_request_and_get_response()
