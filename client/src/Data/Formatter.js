
export const sanitizeCourseTitle = (title) => {
    if (!title) {

    return;
    }

    let sanitizedTitle = '';

    const match = title.match(/\d/);
    const m_match = title.match(/M/);
    const isolatedNumbers = match? parseInt(title.slice(match.index, match.index + 4)) : "";
    const letterMatch = title.slice(match.index).match(/[A-LN-Z]/i);
    if (m_match) {
        sanitizedTitle += 'M';
    }

    sanitizedTitle += String(isolatedNumbers);

    if (letterMatch) {
        sanitizedTitle += String(letterMatch[0]);
    }

    return sanitizedTitle;  
};

