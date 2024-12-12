# Meal

**Meal** is your go-to platform for discovering, creating, and sharing delicious recipes. Whether you’re a seasoned chef or a kitchen newbie, explore a world of culinary inspiration in one simple, user-friendly hub.



## Features

- **Create Recipes**: Easily create and save your favorite recipes.
- **Edit Recipes**: Update your recipes with new ingredients or instructions.
- **Publish Recipes**: Share your culinary creations with the world.



## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/meal-app.git
cd meal-app

```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables
Create a .env.local file in the root directory and add the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Replace your-project-url and your-anon-key with your Supabase project details.



# Supabase Setup


### 1. Create a Supabase Project
- Go to [Supabase](https://supabase.com/) and create a new project.
- Note the project URL and the anonymous API key for your environment variables.

### 2. Set Up the Database Schema
In the Supabase dashboard, navigate to the SQL editor and run the following:

```sql
-- Create Recipes Table
CREATE TABLE recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    tags TEXT[],
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    ingredients TEXT,
    instructions TEXT[] NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    public_link TEXT,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 3. Enable Row-Level Security (RLS)

Enable row-level security for the `recipes` table by running the following SQL command:

```sql
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
```

### 4. Add Access Policies

Allow Users to Insert Recipes:

```sql 
CREATE POLICY "Allow insert for authenticated users"
ON recipes
FOR INSERT
USING (auth.uid() IS NOT NULL);
```


#### Allow Users to Update Their Recipes:

 ```sql 
CREATE POLICY "Allow select for public or own recipes"
ON recipes
FOR SELECT
USING (is_public OR auth.uid() = user_id);
```


### 5. Optional: Add a Storage Bucket
If your app includes images, follow these steps to set up storage in Supabase:

1. Go to the **Storage** section in your Supabase dashboard.
2. Create a bucket named `images`.
3. Inside the `images` bucket, create a folder named `public`.

Ensure that you set the appropriate access policies for the bucket if needed.


## Supabase Authentication Setup



1. Go to the **Authentication** section in the Supabase dashboard.
2. Navigate to the **Settings** tab and select **Email & Password** under the sign-in methods.
3. Enable the option to allow sign-ups using email and password.


#### Disable Email Confirmation for Sign-Ups
To disable the email confirmation step:

1. In the **Settings** tab, scroll down to **Confirmation email** settings.
2. Turn off the toggle for "Require email confirmation for sign-ups."

This will allow users to log in immediately after signing up without confirming their email.

----


## Run the Development Server

Start the app locally:

````
npm run dev
````
Open http://localhost:3000 to view the app.



## Contributing

We welcome contributions to make **Meal** even better! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with your changes.
