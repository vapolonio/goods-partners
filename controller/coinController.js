import Rx from 'rx'
import RxNode from 'rx-node'


export let listCoins = (source) => {
    let nameList = {
        coin: ['bitcoin', 'litecoin']
    }
    return Rx.Observable.just(nameList)
};