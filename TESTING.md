# Testing the Embedded Widget System Locally

This guide explains how to run and test the embedded widget system locally.

## Prerequisites

1. Node.js (version 18+)
2. npm (comes with Node.js)
3. http-server (`npm install -g http-server`)

## Option 1: Using the Provided Scripts

### Windows

Choose one of the following methods:

#### Using the Batch Script:

```
.\start-demo.bat
```

#### Using the PowerShell Script:

```
.\start-demo.ps1
```

These scripts will:

1. Start the embedded widget server
2. Wait a few seconds for it to initialize
3. Start the parent websites HTTP server
4. Display the URLs to access the demo websites

## Option 2: Manual Setup

If you prefer to start the servers manually:

### Step 1: Start the Embedded Widget Server

```
cd embedded-widget
npm run dev
```

This will start the Next.js server at http://localhost:3000

### Step 2: Start the Parent Websites Server

```
cd parent-websites
npx http-server -p 8080
```

This will serve the parent websites at http://localhost:8080

## Accessing the Demo Websites

Once both servers are running, access the demo websites at:

- E-commerce: http://localhost:8080/e-commerce/
- Finance App: http://localhost:8080/finance-app/
- SaaS Dashboard: http://localhost:8080/saas-dashboard/

## Troubleshooting

### Widget Not Loading

If the widget doesn't appear:

1. Check your browser console for errors
2. Verify that both servers are running
3. Make sure you've started the embedded widget server first
4. Check that the URL in the parent website HTML is correct
   (should be `http://localhost:3000/widget/embed`)

### CORS Issues

If you see CORS errors in the console:

1. Check that the embedded widget server is running
2. Verify that the route handler in `embedded-widget/app/widget/embed/route.ts`
   has the correct CORS headers
3. Try restarting both servers

### NPM Package Issues

If you encounter issues with missing packages:

```
cd embedded-widget
npm install
```

Then try starting the servers again.
