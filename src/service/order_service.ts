import { ApiClient } from ".";
import { useCookies } from "vue3-cookies";
import type { OrderRecord, OrderResponse } from "@/model/order/order";
class OrderService extends ApiClient{
    public getStatus(data: getStatusRequest) {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        // const status = parseInt(data.status)
        return this.$get<OrderResponse<OrderRecord>>("status/"+data.status,
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    public putStatus(data: putStatusRequest) {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$put<OrderResponse<OrderRecord>>(data.id, data.body,
             {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    public getOrderByID(data: getOrderByIDRequest) {
        const { cookies } = useCookies();
        const token = cookies.get('token');
        return this.$get<OrderResponse<OrderRecord>>(data.id,
            {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
export const orderService = new OrderService("order");