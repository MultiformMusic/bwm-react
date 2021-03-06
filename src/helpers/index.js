
import * as moment from 'moment';

export const rentalType = isShared => isShared ? 'shared' : 'entire';

export const toUppercase = value => value;

export const getRangeOfDates = (startAt, endAt, dateFormat = 'Y/MM/DD') => {

    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
        tempDates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day');
    }

    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
}

export const pretyfiDate = date => moment(date).format('MMM Do YY');