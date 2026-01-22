package at.htl.leonding.android_frontend.di

import at.htl.leonding.android_frontend.data.api.PcApi
import at.htl.leonding.android_frontend.data.repo.PcRepository
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory
import kotlin.jvm.java


object ServiceLocator {

    // TODO: Setze deine echte Backend-Base-URL (Quarkus).
    // Beispiel: "http://10.0.2.2:8080/" für Emulator->localhost.
    private const val BASE_URL = "http://10.0.2.2:8080/api/"

    private val moshi: Moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    private val okHttp: OkHttpClient = OkHttpClient.Builder().build()

    private val retrofit: Retrofit = Retrofit.Builder()
        .baseUrl(BASE_URL)
        .client(okHttp)
        .addConverterFactory(MoshiConverterFactory.create(moshi))
        .build()

    val api: PcApi = retrofit.create(PcApi::class.java)

    val repository: PcRepository = PcRepository(api)
}
