'''
Created on 07-Apr-2014

@author: pavang
'''

class Properties:
    
    def __init__(self, stream, sep = '='):
        """
            
        """
        # Dictionary of properties.
        self._props = {}
        
        self.stream = stream
        self.sep = sep
           
    
    def dump(self):
        pass
    
    def load(self):
        """ Load properties from an open file stream """

        # For the time being only accept file input streams
#         if type(self.stream) is not file:
#             raise TypeError,'Argument should be a file object!'
        # Check for the opened mode
#         if self.stream.mode != 'r':
#             raise ValueError,'Stream should be opened in read-only mode!'
        
        with open(self.stream) as prop_file:
            for line in prop_file.readlines():
                # below condition will ignore empty lines
                if line in ['\n', '\r\n']:
                    continue
                key, value = line.strip().split(self.sep)
                self._props[key] = value
        
        return self._props
    
    def print_prop(self, print_sep = '='):
        """
        print given dictionary and put separator between key and value
        while printing
    """
        for key, value in self._props.items():
            print(str(key) + print_sep + '   ' + str(value))
                
           

if __name__ == '__main__':
#     p = Properties(r"/Users/pavang/Projects/github/self_github/TEServices/config/TEServices.properties")
#     p.load()
#     p.print_prop()
    pass