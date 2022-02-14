import {initializeBlock, loadCSSFromString, useBase, useRecords} from '@airtable/blocks/ui';
import React, { useEffect, useState } from 'react';
// import Walker from './walker'
// import './index.css';
import { GraphicWalker } from '@kanaries/graphic-walker';
import stylecss from './style';
import View from '@airtable/blocks/dist/types/src/models/view';
import { IMutField } from '@kanaries/graphic-walker/dist/interfaces';

loadCSSFromString(stylecss)

async function getMetaData(view: View) {
    const columns = view.selectMetadata()
    await columns.loadDataAsync()
    const fields: IMutField[] = columns.visibleFields.map(f => ({
        name: f.name,
        key: f.name,
        analyticType: f.type === 'number' ? 'measure' : 'dimension',
        semanticType: '?',
        dataType: '?'
    }))
    return fields;
}

function HelloWorldTypescriptApp() {
    // YOUR CODE GOES HERE
    const [fields, setFields] = useState<IMutField[]>([]);
    const base = useBase();
    const table = base.getTableByName('students')
    useEffect(() => {
        getMetaData(table.views[0]).then(res => {
            setFields(res);
        })
    }, [table])
    const records = useRecords(table);
    const rows = records.map(r => {
        let row: {[key: string]: any} = {};
        fields.forEach(f => {
            if (f.analyticType === 'dimension') {
                row[f.key] = r.getCellValueAsString(f.key)// [f.key]
            } else {
                row[f.key] = r.getCellValue(f.key)// [f.key]
            }
            
        })
        return row
    })
    console.log('records', rows);
    return <div>
        {/* {records.length > 0 && JSON.stringify(records[0])} */}
        <GraphicWalker dataSource={rows} rawFields={fields} />
    </div>;
}

initializeBlock(() => <HelloWorldTypescriptApp />);
