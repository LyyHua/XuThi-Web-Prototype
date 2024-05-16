import { TabPane, Tab } from 'semantic-ui-react'

const panes = [
  {
    menuItem: 'GIAO HÀNG & ĐỔI TRẢ',
    render: () => (
        <TabPane attached={false}>
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
    ),
  },
  {
    menuItem: 'VỀ THƯƠNG HIỆU',
    render: () => (
      <TabPane className='tabpanedesktop' attached={false}>
        <p className='text-font'><strong>"Nâng niu bàn chân của phái nữ "</strong></p>
        <p className='text-font'>Đây là slogan cũng là mục tiêu mà thương hiệu Xuthi nhắm tới đó chính là tạo ra những sản phẩm có thể hạn chế tối đa sự khó chịu mỗi khi mang giày cao gót của chị em phụ nữ.</p>
        <p className='text-font'>Xuthi là thương hiệu mới ra mắt với quyết tâm và ý chí hi vọng sẽ trở thành một thương hiệu thời trang giày dép được phụ nữ Việt Nam yêu thích và chọn lựa bằng chính chất lượng sản phẩm chúng tôi mang lại cho khách hàng. </p>
      </TabPane>),
  },
]

const ProductPageTabs = () => (
    <Tab
      style={{marginBottom: '3em'}}
      className='scrollable-tab'
      menu={{ 
        secondary: true, 
        pointing: true, 
      }}
      panes={panes} 
    />
)

export default ProductPageTabs