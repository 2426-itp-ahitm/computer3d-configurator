package at.htl.leonding.android_frontend.data.repo

import at.htl.leonding.android_frontend.data.api.PcApi

class PcRepository(private val api: PcApi) {
    suspend fun getCpus() = api.getCpus()
}
