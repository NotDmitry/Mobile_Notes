import {useMemo} from "react";

export const useSortedNotes = (notes, sort) => {
    return useMemo(() => {
        if (sort) {
            return [...notes].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return notes
    }, [sort, notes])
}

export const useSearchedNotes = (notes, sort, searchQuery) => {
    const sortedNotes = useSortedNotes(notes, sort)

    return useMemo(() => {
        return notes.filter(note => note.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedNotes])
}