@extends('frame')
@section('konten')
<div id="website_div" style="height: 90vh;"></div>
<script>
    $("#website_div").html($('<iframe src="{{(request()->getHttpHost() === "tribin.test" ? "http://".request()->getHttpHost() : "https://".request()->getHttpHost())}}/tribinapp/#/{{$routeApp}}" width="100%" height="100%" border="0"/>' ));
</script>
@endsection
