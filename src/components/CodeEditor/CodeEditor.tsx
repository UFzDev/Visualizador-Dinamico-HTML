import { useCallback } from 'react';
import type { FC } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EDITOR_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  wordWrap: 'on' as const,
  padding: { top: 16 },
};

export const CodeEditor: FC<CodeEditorProps> = ({ value, onChange }) => {
  const handleChange = useCallback(
    (nextValue: string | undefined) => {
      onChange(nextValue ?? '');
    },
    [onChange]
  );

  return (
    <div className="editor-panel">
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-panel)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600 }}>HTML / CSS Editor</h3>
      </div>
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          defaultLanguage="html"
          theme="vs-dark"
          value={value}
          onChange={handleChange}
          options={EDITOR_OPTIONS}
        />
      </div>
    </div>
  );
};
