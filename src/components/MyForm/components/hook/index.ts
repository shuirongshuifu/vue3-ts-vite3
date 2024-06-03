export function useHookSlots(slots: any, prop: any) {
    const filterSlots = Object.entries(slots).reduce((acc, [slotName, slotContent]) => {
        if (slotName.includes(prop)) {
            acc[slotName] = slotContent;
        }
        return acc;
    }, {} as Record<string, any>)
    return {
        filterSlots: filterSlots
    }
}