# NLQ Test Kit

This comprehensive testing toolkit for Natural Language Query (NLQ) systems has been built with Next.js 16, React 19, and Google Gemini SDK.

This tool assists developers in validating and testing NLQ engines, which are capable of converting natural language inquiries into structured database queries. It employs Google's Gemini AI as a deterministic SQL analysis engine to process queries against database schemas and generate query intents with dimensions and metrics. The project utilizes the TOON (Table-Oriented Object Notation) format to achieve a 50-80% reduction in API calls, making it cost-effective for large-scale testing. The intuitive dashboard allows developers to define database schemas, create test cases, and instantly validate results with detailed pass/fail metrics.

## Setup

1. **Environment Variables**:
   Create a `.env.local` file in the root directory and add your Google Gemini API key:

   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-2.0-flash-exp
   ```

2. **Install Dependencies**:

   ```bash
   pnpm install
   ```

3. **Run Development Server**:

   ```bash
   pnpm run dev
   ```

## Features

- **Gemini Integration**: Uses `@google/genai` SDK to simulate a deterministic SQL engine.
- **TOON Format**: Compressed JSON format for 50-80% token reduction in schema and test data.
- **Server Actions**: Securely handles API keys on the server.
- **Dashboard**: Interactive Monaco editors for Schema and Test Cases with syntax highlighting.
- **Fuzzy Matching**: Validates test results regardless of array order.
- **Modern UI**: Built with HeroUI, Tailwind CSS, and Framer Motion for smooth animations.
