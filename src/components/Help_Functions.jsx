function sortDates(date1, date2) {
    const date1Blank = !date1;
    const date2Blank = !date2;

    if (date1Blank && !date2Blank) return -1;
    if (!date1Blank && date2Blank) return 1;
    if (date1Blank && date2Blank) return 0;

    const tempDate1 = new Date(date1).getTime();
    const tempDate2 = new Date(date2).getTime();

    const date1Valid = Number.isFinite(tempDate1);
    const date2Valid = Number.isFinite(tempDate2);

    if (date1Valid && date2Valid) return date2Valid - date1Valid;
    if (date1Valid && !date2Valid) return -1;
    if (!date1Valid && date2Valid) return 1;
    return 0;
}


export {sortDates}