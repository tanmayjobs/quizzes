import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayRecordModel } from './records.models';
import { Constants } from './constants';

@Injectable({ providedIn: 'root' })
export class RecordsService {
    constructor(private httpClient: HttpClient) { }

    getTopRecords(): Promise<PlayRecordModel[]> {
        return new Promise<PlayRecordModel[]>((resolve, reject) => {
            setTimeout(
                () =>
                    resolve([
                        new PlayRecordModel(
                            'w0w-1k2-w02',
                            'wsf-1kf-d02',
                            100,
                            'Batman',
                            'Gotham'
                        ),
                        new PlayRecordModel(
                            'w0w-1k2-w02',
                            'wsf-1kf-d02',
                            90,
                            'Alfred',
                            'Gotham I'
                        ),
                        new PlayRecordModel(
                            'w0w-1k2-w02',
                            'wsf-1kf-d02',
                            99,
                            'Batman',
                            'Assylum'
                        ),
                    ]),
                100
            );
        });
    }

    getRecords(user_id = null, quiz_id = null){
        let params = new HttpParams();
        if (user_id){
            params = params.set("user_id", user_id);
        }
        if (quiz_id){
            params = params.set("quiz_id", quiz_id);
        }
        return this.httpClient.get(`${Constants.BASEURL}/records`, {
            params: params,
        });
    }
}
