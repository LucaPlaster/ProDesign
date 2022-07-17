import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from "../NotificationButton";
import { BASE_URL } from "../../utils/request";
import "./styles.css";
import { Sale } from "../../models/sale";

function SalesCard() {
  const max = new Date();
  const min = new Date(new Date().setDate(new Date().getDate() - 365));

  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(max);

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {

    const dmin = minDate.toISOString().slice(0, 10);
    const dmax = maxDate.toISOString().slice(0, 10);

    axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`).then((response) => {
      setSales(response.data.content);
    });
  }, [minDate, maxDate]);

  return (
    <div className="ProDesign-card">
      <h2 className="ProDesign-sales-title">Vendas</h2>
      <div>
        <div className="ProDesign-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="ProDesign-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <div>
        <table className="ProDesign-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <th className="show992">{sale.id}</th>
                  <th className="show576">{new Date(sale.date).toLocaleDateString()}</th>
                  <th>{sale.seller_name}</th>
                  <th className="show992">{sale.visited}</th>
                  <th className="show992">{sale.deals}</th>
                  <th>R$ {sale.amount.toFixed(2)}</th>
                  <th>
                    <div className="ProDesign-red-btn-container">
                      <NotificationButton />
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalesCard;
