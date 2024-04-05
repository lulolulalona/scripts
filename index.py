from flask import Flask, redirect, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def redirect_request():
    if request.headers.get('User-Agent') and 'Roblox' in request.headers.get('User-Agent'):
        # Redirect requests from Roblox to another URL
        return redirect("https://www.another-website.com/", code=307)  # 307 preserves the method and request body
    else:
        # Handle other requests normally
        return "Welcome to your website!"

if __name__ == '__main__':
    app.run(debug=True)
