const Realm = require('realm');

// const val = {
//     "durak_kodu": "102161",
//     "durak_adi": "SAFİR SİTESİ",
//     "durak_yonu": "BAKIRKÖY",
//     "x_koordinat": "28.764048",
//     "y_koordinat": "41.103848",
//     "enerji": "-1",
//     "durak_tipi": "CCMODERN",
//     "akilli_durak_tipi": "Akilli Durak Yok",
//     "isletme": "İstanbul",
//     "ilce": "BAŞAKŞEHİR"
// }

const stopSchema = {
    name: 'Stop',
    primaryKey: 'durak_kodu',
    properties: {
        durak_kodu: 'string',
        durak_adi: 'string?',
        durak_yonu: 'string?',
        x_koordinat: 'string?',
        y_koordinat: 'string?',
        enerji: 'string?',
        durak_tipi: 'string?',
        akilli_durak_tipi: 'string?',
        isletme: 'string?',
        ilce: 'string?',
    }
}
const dbPromise = Realm.open({
    schema: [stopSchema]
})

export const addStop_DB = async (item) => {
    const realm = await dbPromise;
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                const newStop = realm.create('Stop', item);
                console.log('NEW_STOP', newStop);
                resolve(newStop);
            });

        } catch (error) {
            reject(error)
        }
    })
}
export const getStopList_DB = async () => {
    const realm = await dbPromise;
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                // const newStop = realm.create('Stop', item);
                // console.log('NEW_STOP', newStop);
                // resolve();
                const stopList = Array.from(realm.objects('Stop'));
                resolve(stopList);
            });

        } catch (error) {
            reject(error)
        }
    })
}

export const isStopAdded_DB = async (id) => {
    const realm = await dbPromise;
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                // const stopList = realm.objects('Stop');
                // const theStop = stopList.filtered(`durak_kodu = "${id}"`);
                const theStop = realm.objectForPrimaryKey('Stop', id)
                console.log('theStop', theStop)
                resolve(theStop);
            });
        } catch (error) {
            reject(error)
        }
    })
}
export const deleteStopById = async (id) => {
    const realm = await dbPromise;
    return new Promise((resolve, reject) => {
        try {
            realm.write(() => {
                // const stopList = realm.objects('Stop');
                // const theStop = stopList.filtered(`durak_kodu = "${id}"`);
                const theStop = realm.objectForPrimaryKey('Stop', id)
                realm.delete(theStop);
                resolve();
            });
        } catch (error) {
            reject(error)
        }
    })
}