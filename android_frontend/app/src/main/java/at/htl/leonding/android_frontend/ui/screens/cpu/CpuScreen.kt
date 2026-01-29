package at.htl.leonding.android_frontend.ui.screens.cpu

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import at.htl.leonding.android_frontend.ui.screens.cart.CartViewModel

@Composable
fun CpuScreen(
    cpuVm: CpuViewModel,
    cartVm: CartViewModel
) {
    val cpuState by cpuVm.state.collectAsState()
    val cartState by cartVm.state.collectAsState()

    val cartId = cartState.cart?.id

    CpuListScreen(
        state = cpuState,
        onReload = { cpuVm.reload() },
        onSelectCpu = { cpuVm.selectCpu(it) },
        onAddToCart = {
            if (cartId != null) {
                cpuVm.addSelectedCpuToCart(cartId)
            }
        }
    )
}