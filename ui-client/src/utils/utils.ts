import moment from 'moment-timezone';

const defaultTZ = moment.tz.guess();

export const formatDatetimeWithTZShort = (datetime: string) => {
    return moment(datetime).tz(defaultTZ).format("lll z");
};
