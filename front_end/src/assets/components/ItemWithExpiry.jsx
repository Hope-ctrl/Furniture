export const ItemWithExpiry = (key, value, lifeLine)=>{
    const now = new Date();

    const item = {
        value: value,
        lifeLine: now.getTime() + lifeLine
    }

    localStorage.setItem(key, JSON.stringify(item))
}