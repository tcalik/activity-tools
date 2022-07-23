export let timeDifference = (start: any, end:any) => {
    return (end.time.getTime() - start.time.getTime()) / 1000;
};
