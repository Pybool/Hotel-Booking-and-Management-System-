from rest_framework import status
from django.core.paginator import Paginator

def custom_paginate(APIVIEW,metadata):
    
            is_search = False
            url = metadata['url']
            model = metadata['model']
            request = metadata['request']
            _filter = metadata.get('_filter')
            serializer = metadata['serializer']
            custom_paginator_class = metadata['custom_paginator_class']
            
            q = request.GET.get('q', None)
            q_offset = int(request.GET.get('offset', 1))
            APIVIEW.custom_paginator = custom_paginator_class(APIVIEW.pagination_class,request)
            is_search = True if q else None
            print(_filter)
                
            model_instances = model.objects.filter(_filter).order_by('-id')
            model_instances_count = model_instances.count()
            if model_instances:
                page_size = APIVIEW.pagination_class.default_limit
                paginator = Paginator(model_instances, page_size)
                q_offset = max(1, min(q_offset, paginator.num_pages))
                
                model_instances = paginator.page(q_offset)
                serialized_model_instances = serializer(model_instances,many=True).data
                model_instances_list_of_dicts = [dict(ordered_dict) for ordered_dict in serialized_model_instances]
                    
                response = APIVIEW.custom_paginator.paginate_queryset(model_instances)
                response = APIVIEW.custom_paginator.get_paginated_response(model_instances)
                response.data["status"] = True
                response.data["message"] = "model_instances fetched successfully."
                response.data["data"] = model_instances_list_of_dicts
                response.data["count"] = model_instances_count
                response.data["is_search"] = is_search
                response.status_code = status.HTTP_200_OK
                if len(request.GET.keys()) > 0 and is_search:
                    params = dict(request.GET)
                    try:
                        params.pop('limit')
                        params.pop('offset')
                    except:
                        pass
                    response.data["query"] = APIVIEW.makeSearchParamString(params)
                total_pages = (model_instances_count + page_size - 1) // page_size
                response.data['last'] = f'{url}?limit={page_size}&offset={total_pages}'
                _response = {"status":response.data["status"],
                            "message":response.data["message"],
                            "data":response.data["data"],
                            "count":response.data["count"] ,
                            "is_search":response.data["is_search"],
                            "last":response.data['last']
                            }
                return _response
            