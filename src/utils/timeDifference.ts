export let timeDifference = (start: any, end:any) => {
    return (start.time.getTime() - end.time.getTime()) / 1000;
};
