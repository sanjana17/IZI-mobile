
import React , {Component} from 'react';
import axios from 'axios';
import tableView from './tableView';
class Table extends Component{
    constructor(){
        super();
        this.state = {
            tableData:[]
        }
    }

    componentDidMount() {
        var _this = this;
        this.serverRequest =
            axios.get(" https://dev.requiemapp.com/public/memorial/random")
                .then(function(result) {
                    _this.setState({
                        tableData: result.data.data
                    });
                })
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }

    render(){
        return(this.getTemplate());
    }
    sort(){
         function compare(a,b) {
             if(a.name && a.name.last && b.name && b.name.last) {
                 if (a.name.last < b.name.last)
                     return -1;
                 if (a.name.last > b.name.last)
                     return 1;
             }
            return 0;
        }
        this.state.tableData.sort(compare);
    }
    getTemplate(data){
        if(this.state.tableData.length !== 0) {
            return (
                <div>
                    <button className="btn btn-primary" onClick={this.sort()}>Sort Columns</button>
                    <table className="table">
                    <thead>
                    <tr className="row">
                        <th className="col-md-1">Name</th>
                        <th className="col-md-2">Phone</th>
                        <th className="col-md-4">Message</th>
                        <th className="col-md-1">Share</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.tableData.map(function (name, index) {
                        return name?(name.name?<tr className="row"><td className="col-md-1">{(name.name.first + ' ' + name.name.last)}</td>
                            <td className="col-md-2">{name.deceasedPhone}</td>
                            <td className="col-md-4">{name.messagePreface}</td><td><button className="form-control btn-primary" value="Share"><a href={name.shareUrl} className="link">Share</a></button></td></tr>:''):'';
                    })}

                    </tbody>
                </table>
                </div>
            )
        }
        else{
            return(
                <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                        </tr>
                    </thead>
                </table>
            )
        }
    }
}
export default Table;