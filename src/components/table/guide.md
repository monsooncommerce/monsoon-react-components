------

### Import

```
import { Table } from '@monsoon_inc/monsoon-components';
```
&nbsp;

-------

### Examples:
```
const testTableData = {
  'key_one': 'value_one',
  'key_two': 'value_two',
};

const testTableConfig = {
  keyFormatter: (val) => val,
  valueFormatter: (val) => val,
};


<Table
  data={testTableData}
  config={testTableConfig}
/>
```
&nbsp;

-------

### props:
- data: An object where the key and values will represent the table's key and value
- config: An object with
  - keyFormatter: function that receives the data object key. Needs to return a string, number or element.
  - valueFormatter: function that receives the data object value. Needs to return a string, number or element.
