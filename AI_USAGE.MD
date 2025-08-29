# Use of Artificial Intelligence

This project involved some assistance from **ChatGPT (GPT-5, OpenAI)**.  
Below is a transparent breakdown of how AI was used.

## AI Tool
- **Service/Tool:** ChatGPT
- **Version:** GPT-5

## Purpose of Usage
- **Code generation** – converting design reference HTML/CSS into React + Tailwind components.
- **Bug finding/debugging** – resolving ESLint and TypeScript errors.
- **Documentation writing** – improving this README for clarity.
- **Concept explanation** – asking AI to clarify linting/TypeScript errors.
- **Translation generation** – creating multilingual text for the project.

## Specific Tasks
1. **Login & Register Page Layouts**
    - Took a layout reference from the task PDF.
    - Copied a similar design from CodePen into a text file (`codepen-layout.txt`).
    - Asked ChatGPT to convert it into React + Tailwind components.
    - Requested only the layout (no animations or validations).
    - After manual adjustments, the result matched the given design reference.

2. **ESLint & TypeScript Fixes**
    - Pasted error logs into ChatGPT.
    - Got corrected versions of the code that resolved the problems.

3. **Project Translations**
    - The task PDF provided base translations like:
      ```json
      {
        "common": {
          "loading": "Loading..." / "Загрузка...",
          "error": "Error" / "Ошибка",
          "success": "Success" / "Успешно",
          "email": "Email" / "Email",
          "password": "Password" / "Пароль",
          "logout": "Logout" / "Выйти",
          "profile": "Profile" / "Профиль"
        }
      }
      ```  
    - Using this format, I asked ChatGPT to generate translations for all other text across the project in both English and Russian.
    - This ensured consistency and saved time compared to manually translating every string.

4. **Documentation (This File)**
    - This README was improved with ChatGPT to be easier to read and more structured.

## Percentage of AI-Written Code
- Approximately **25–30%** of the codebase was AI-assisted.
- Most logic, refinements, and final implementations were done manually.
