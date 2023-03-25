import {useMemo} from "react";

export const useSortedNotes = (notes, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...notes].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return notes
    }, [sort, notes])
}

export const useSearchedNotes = (notes, searchQuery) => {
    return useMemo(() => {
        return notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, notes])
}