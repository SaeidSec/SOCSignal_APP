"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';

// Types for plugins (many don't have official types, so we use any for speed here)
const EDITOR_JS_TOOLS = {
    header: require('@editorjs/header'),
    list: require('@editorjs/list'),
    code: require('@editorjs/code'),
    table: require('@editorjs/table'),
    link: require('@editorjs/link'),
    image: require('@editorjs/image'),
    quote: require('@editorjs/quote'),
    delimiter: require('@editorjs/delimiter'),
    warning: require('@editorjs/warning'),
    embed: require('@editorjs/embed'),
};

interface EditorProps {
    data?: OutputData;
    onChange?: (data: OutputData) => void;
    placeholder?: string;
    holder: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, placeholder, holder }) => {
    const editorInstance = useRef<EditorJS | null>(null);

    const initEditor = useCallback(() => {
        const editor = new EditorJS({
            holder: holder,
            data: data,
            placeholder: placeholder || 'Start writing technical research...',
            tools: EDITOR_JS_TOOLS,
            async onChange(api) {
                const savedData = await api.saver.save();
                if (onChange) {
                    onChange(savedData);
                }
            },
        });

        editorInstance.current = editor;
    }, [holder, data, onChange, placeholder]);

    useEffect(() => {
        if (!editorInstance.current) {
            initEditor();
        }

        return () => {
            if (editorInstance.current && editorInstance.current.destroy) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [initEditor]);

    return <div id={holder} className="prose prose-invert max-w-none min-h-[500px]" />;
};

export default Editor;
