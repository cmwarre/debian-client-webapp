#!/usr/bin/python
from server.app import app


def main():
    app.run(debug=True, host="0.0.0.0", port=8080)

if __name__ == "__main__":
    main()