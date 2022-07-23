const Filter = (props) => {
    return(
        <div>
            <div>
                filter shown with <input value = {props.search} onChange={props.handleSearchChange}/>
            </div>
        </div>
    )
}
export default Filter