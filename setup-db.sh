#!/bin/bash

# Supabase + Prisma Setup Script
# Run this after configuring your .env file with Supabase credentials

echo "Setting up database..."

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

echo "Database setup complete!"

# Optional: Open Prisma Studio to manage data
# npx prisma studio