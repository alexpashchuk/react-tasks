export const getUrlId = (url: string) => {
    const splitedUrl = url.split('/');
    return splitedUrl[splitedUrl.length - 2];
};
