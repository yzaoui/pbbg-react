import * as RxJS from "rxjs";

const farmService = {
    getPlot: () => RxJS.from(
        new Promise(resolve => setTimeout(resolve, 1000))
    )
};

export default farmService;
