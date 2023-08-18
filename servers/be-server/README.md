 # MARTHA - 2023 / be & OpenAI API server 

  - Add your OpenAI API key

    ```
    cd be-server
    cp .env.example .env
    ```

  - Run the server (default port is: `5000`)

    ```
    python3 -m venv venv
    (mac OS) source venv/bin/activate | (Windows) . venv/bin/activate
    pip install -r requirements.txt
    python models.py #db set. /instance/db
    flask --debug run
    ```
