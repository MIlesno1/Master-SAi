/*
  # Create chat history table

  1. New Tables
    - `chat_history`
      - `id` (uuid, primary key)
      - `text` (text, message content)
      - `sender` (text, user or ai)
      - `mentor_type` (text, type of mentor)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on `chat_history` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  sender text NOT NULL,
  mentor_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages"
  ON chat_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);