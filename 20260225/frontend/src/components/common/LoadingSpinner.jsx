import React from 'react';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div className="flex items-center justify-center gap-3 py-16 text-gray-400">
            <div className="w-6 h-6 border-[2.5px] border-accent/20 border-t-accent rounded-full animate-spin" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}
