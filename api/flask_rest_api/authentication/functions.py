from werkzeug.security import safe_str_cmp

def authenticate(username, password):
    #user = username_table.get(username, None)
    #if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
    #    return user
    return None

def identity(payload):
    #user_id = payload['identity']
    #return userid_table.get(user_id, None)
    return None