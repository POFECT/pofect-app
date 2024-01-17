// FontSizeProvider.js

import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState(12.5); // Default font size
    const MIN_FONT_SIZE = 10;
    const MAX_FONT_SIZE = 18;

    const increaseFontSize = () => {
        setFontSize((prevSize) => {
            const newSize = prevSize * 1.25;
            return newSize <= MAX_FONT_SIZE ? newSize : MAX_FONT_SIZE;
        });
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => {
            const newSize = prevSize * 0.75;
            return newSize >= MIN_FONT_SIZE ? newSize : MIN_FONT_SIZE;
        });
    };

    return (
        <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    return useContext(FontSizeContext);
};