import { TabPane } from "semantic-ui-react";

export default function ReturnPolicy() {
  return (
    <TabPane className="chinh-sach-doi-tra" style={{marginTop: '6em', width: '90%', marginBottom: '2em'}}>
      <h1 style={{textAlign: 'center'}} className='text-font'><strong>CHÍNH SÁCH ĐỔI TRẢ</strong></h1>
      <p className='text-font'><strong>Áp dụng cho toàn bộ sản phẩm giày dép của XuThi.</strong></p>
          <p className='text-font'><u>Đối tượng khách hàng:</u> Tất cả khách hàng sử dụng dịch vụ tại <a style={{textDecoration: 'none', color: 'inherit'}} href='https://www.xuthi.com'><strong><em>www.xuthi.com</em></strong></a></p>
          <p className='text-font'><strong>Thời gian đổi/ trả hàng <em>nguyên giá:</em></strong></p>
          <ul>
            <li className='text-font'><strong>Đổi hàng:</strong> Trong vòng <strong>30 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
            <li className='text-font'><strong>Trả hàng:</strong> Trong vòng <strong>30 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
          </ul>
          <p className='text-font'><strong>Thời gian đổi/ trả hàng <em>khuyến mãi (áp dụng cho giá sau giảm khuyến mãi):</em></strong></p>
          <ul>
            <li className='text-font'><strong>Đổi hàng:</strong> Trong vòng <strong>07 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
            <li className='text-font'><strong>Trả hàng:</strong> Trong vòng <strong>07 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
          </ul>
          <p className='text-font'><strong>Thời gian đổi/ trả hàng <em>mua bằng mã khuyến mãi:</em></strong></p>
          <ul>
            <li className='text-font'><strong>Đổi hàng:</strong> Áp dụng theo quy định đổi trả hàng khuyến mãi</li>
            <li className='text-font'><strong>Trả hàng:</strong> Áp dụng theo quy định đổi trả hàng khuyến mãi</li>
          </ul>
          <p className='text-font'><strong>Thời gian đổi/ trả hàng <em>tặng:</em></strong></p>
          <ul>
            <li className='text-font'><strong>Đổi hàng:</strong> Trong vòng <strong>07 ngày</strong> kể từ ngày khách hàng nhận được sản phẩm.</li>
            <li className='text-font'><strong>Không áp dụng trả sản phẩm</strong></li>
          </ul>
          <p className='text-font'><strong>Ghi chú:</strong> Thời hạn đổi/trả hàng được tính từ ngày khách hàng nhận hàng cho đến ngày khách hàng gửi hàng đổi/trả cho đơn vị vận chuyển.</p>
    </TabPane>
  )
}