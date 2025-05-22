'use client';

import React from 'react';

interface SubmitButtonProps {
  isSaving: boolean;
  isEditing: boolean;
  buttonText?: string; 
  defaultCreateText?: string;
  defaultUpdateText?: string;
  defaultSavingText?: string;
}

export default function SubmitButton({
  isSaving,
  isEditing,
  buttonText,
  defaultCreateText = 'Create',
  defaultUpdateText = 'Update',
  defaultSavingText = 'Saving...',
}: SubmitButtonProps) {
  let text = buttonText;
  if (!text) {
    text = isSaving ? defaultSavingText : (isEditing ? defaultUpdateText : defaultCreateText);
  }

  return (
    <button
      type="submit"
      disabled={isSaving}
      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
    >
      {text}
    </button>
  );
} 