window.onload = function(){
    Main();
};
function Main()
{
    // データを作成する
    var objs = [
        {"id": 0, "name": "うえだ", "class": "B"},
        {"id": 1, "name": "あいだ", "class": "C"},
        {"id": 2, "name": "いいだ", "class": "A"}];
    var sortInfo = { key: "id", order: d3.descending };
    // テーブル要素を作成する
    var table = d3.select("body").insert("table",":first-child").attr("id","NameList");
    var thead = table.append("thead");
    var tbody = table.append("tbody");
    // 列を新規作成する
    thead.append("tr")
        .selectAll("th")
            .data(d3.entries(objs[0]))
            .enter()
            .append("th")
            .on("click", function(d,i){updateTable(d.key);})
            .text(function(d){return d.key;})
    ;
    // 行を新規作成する
    tbody
        .selectAll("tr")
        .data(objs)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(d){return d3.entries(d)})
        .enter()
        .append("td")
        .text(function(d){return d.value;})
    ;
    updateTable("id");

    function updateTable(sortKey)
    {
        // データをソートする
        sortInfo.key = sortKey;
        reverseOrder();
        objs.sort(function(x,y){return sortInfo.order(x[sortKey], y[sortKey])});
        // 列を更新する
        thead.selectAll("tr th")
            .data(d3.entries(objs[0]))
            .text(function(d){return getHeaderText(d);})
        ;
        // 行を更新する
        tbody
            .selectAll("tr")
                .data(objs)
            .selectAll("td")
                .data(function(d){return d3.entries(d)})
                .text(function(d){return d.value;})
        ;
    }
    function getHeaderText(d) {
        if (d.key != sortInfo.key) { return d.key; }
        return (isAscending()) ? d.key+"▲" : d.key+"▼";
    }
    function reverseOrder() {
        if (isAscending()) { sortInfo.order = d3.descending; }
        else { sortInfo.order = d3.ascending; }
    }
    function isAscending() {
        return (sortInfo.order.toString() == d3.ascending.toString()) ? true : false;
    }
}
